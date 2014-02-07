#pragma strict

var Countdown : float;

function Start () {
	yield WaitForSeconds(Countdown);
	Destroy (gameObject);    
}
