#pragma strict

var lastX:float;
var isMoving:boolean = false;
var explosion:GameObject;
var explosionSound:AudioClip;

var numCatches:int;
var bestScore:int = 0;
var health:int = 100;
var lastBest:int = 0;
var hasLost:boolean = false;
var catchCounter:GUIText;

function Start()
{
	numCatches = 0;
	hasLost = false;
	animation.Stop(); // prevent default animation
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