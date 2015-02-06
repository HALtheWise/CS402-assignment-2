#pragma strict

var lastX:float;
var isMoving:boolean = false;
var explosion:GameObject;
var explosionSound:AudioClip;

var numCatches:int;
var bestScore:int = 0;
var health:float;
var lastBest:int = 0;
var hasLost:boolean = false;
var catchCounter:GUIText;

function Start()
{
	health = 100;
	numCatches = 0;
	hasLost = false;
	animation.Stop(); // prevent default animation
	bomb.transform.position.y = 100;
	mug.transform.position.y = 100;
}

function Update()
{
	updateDisplays();

	transform.position.x = (Input.mousePosition.x)/Screen.width * 150 - 50;
	
	if(lastX != transform.position.x){ //Mouse is moving
		
		if (!isMoving){
			isMoving = true;
			if (!animation.IsPlaying("catch")){
				animation.Play("step");
			}
		}
	}else{
		if (isMoving){
			isMoving = false;
			if (!animation.IsPlaying("catch")){
				animation.Play("idle");
			}
		}		
	}
	lastX = transform.position.x;
}

function OnGUI(){
	drawPieClock();
	if (hasLost){
		
		var buttonW:int = 100; // button width
		var buttonH:int = 50; // button height
		var halfScreenW:float = Screen.width/2; 
		var halfButtonW:float = buttonW/2; 
		
		if(GUI.Button(Rect(halfScreenW-halfButtonW, Screen.height*.8,
				buttonW, buttonH), "Play Again?"))
		{
			Start();
		}
		
	}
}

var bomb:GameObject;
var mug:GameObject;

function Die(){
	bomb.transform.position.y = 100000;
	mug.transform.position.y = 100000;
	Application.ExternalCall("ga", 'send', 'event', 'event', 'win', 'Denison Dropper', catchCounter);
}

function updateDisplays(){
	var str:String = "";
	
	if(!hasLost){
		str = numCatches.ToString();
	}
	else {
		str = "Hits:" + numCatches.ToString() + "\nYour best:" +
		bestScore;
		if(bestScore > lastBest) str += "\nNEW RECORD!";
	}
	catchCounter.text = str;
	
	if(health <= 0){
		if(!hasLost) {
			hasLost = true;
			Die();
			lastBest = bestScore;
			if(numCatches > bestScore) {
				bestScore = numCatches;
			}
		}
	}
}

function OnCollisionEnter(col : Collision)
{
	if(col.gameObject.tag == "bomb")
	{
		audio.PlayOneShot(explosionSound);
		health -= 20;
		Instantiate(explosion, col.gameObject.transform.position, Quaternion.identity);
	}
	else if (col.gameObject.tag == "stein")
	{
		animation.Play("catch");
		numCatches++;
	}
	col.gameObject.transform.position.y = 50;
	col.gameObject.transform.position.x = Random.Range(0,60);
}


var rightSide:Texture2D;
var leftSide:Texture2D;
var back:Texture2D;
var blocker:Texture2D;
var shiny:Texture2D;
var finished:Texture2D;

function drawPieClock(){

	if (hasLost) return;

	var gap = 20;
	var w:int = back.width;
	var h:int = back.height;
	var clockRect:Rect = new Rect(0,0,w,h);
	var visibleAngle:float = health / 100 * 360.0;
	
	var centerPoint:Vector2 = Vector2(w/2, h/2);
	var startMatrix:Matrix4x4 = GUI.matrix;
	
	GUI.BeginGroup(new Rect(Screen.width - w - gap, 200, w, h));
		
		GUI.DrawTexture(clockRect, back);
		
		if(health < 50) //Clock is more than half way depleted
		{
			GUIUtility.RotateAroundPivot(-visibleAngle, centerPoint);
			GUI.DrawTexture(clockRect, rightSide, ScaleMode.StretchToFill, true, 0);
			GUI.matrix = startMatrix;
			GUI.DrawTexture(clockRect, blocker);
		} else {
			GUIUtility.RotateAroundPivot(-visibleAngle, centerPoint);
			GUI.DrawTexture(clockRect, rightSide, ScaleMode.StretchToFill, true, 0);
			GUI.matrix = startMatrix;
			GUI.DrawTexture(clockRect, leftSide);
		}
		
		if (health <= 0) GUI.DrawTexture(clockRect, finished);
		GUI.DrawTexture(clockRect, shiny);
		
		
	GUI.EndGroup();	
}