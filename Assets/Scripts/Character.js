#pragma strict

var lastX:float;
var isMoving:boolean = false;

function Start()
{
	animation.Stop(); // prevent default animation
}
function Update()
{
	var halfW:float = Screen.width / 2;
	transform.position.x = (Input.mousePosition.x)/20;
	
	if(lastX != transform.position.x){ //Mouse is moving
		
		if (!isMoving){
			isMoving = true;
			animation.Play("step");
		}
	}else{
		if (isMoving){
			isMoving = false;
			animation.Play("idle");
		}		
	}
	lastX = transform.position.x;
}