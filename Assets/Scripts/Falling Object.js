#pragma strict

var explosion:GameObject;
var clip1:AudioClip;
var speed:float;
function Start () {

}

function Update(){
	transform.position.y -= speed * Time.deltaTime;
	if(transform.position.y <= 0)
	{
		audio.PlayOneShot(clip1);
		Instantiate(explosion, transform.position, Quaternion.identity);
		Respawn();
	}
}

function Respawn(){
		transform.position.y = 50;
		transform.position.x = Random.Range(0,60);
		transform.position.z = -16;
}