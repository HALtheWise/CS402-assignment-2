#pragma strict

var explosion:GameObject;
var speed:float;
function Start () {

}

function Update(){
	transform.position.y -= speed * Time.deltaTime;
	if(transform.position.y <= 0)
	{
		Instantiate(explosion, transform.position, Quaternion.identity);
		Respawn();
	}
}

function Respawn(){
		transform.position.y = 50;
		transform.position.x = Random.Range(0,60);
		transform.position.z = -16;
}