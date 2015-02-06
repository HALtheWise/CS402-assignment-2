#pragma strict

var explosion:GameObject;
function Start () {

}

function Update(){
	transform.position.y -= 50 * Time.deltaTime;
	if(transform.position.y <= 0)
	{
		Instantiate(explosion, transform.position, Quaternion.identity);
		transform.position.y = 50;
		transform.position.x = Random.Range(0,60);
		transform.position.z = -16;
	}
}