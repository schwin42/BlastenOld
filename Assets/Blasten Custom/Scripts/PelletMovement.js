var pelletspeed : float;

function Update () {
	transform.Translate(pelletspeed * Time.deltaTime,0,0);
	Destroy(gameObject, 1);
	
}