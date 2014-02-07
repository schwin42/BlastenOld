#pragma strict

var KineticLevel : float = 0;

function Start () {

}

function Update () {
	KineticCharge();

}

function KineticCharge(){
	if (Input.GetAxis("Horizontal") == 1) {
		KineticLevel += Time.deltaTime * 1;
		Debug.Log(KineticLevel);
	}
	if (Input.GetAxis("Horizontal") == -1) {
		KineticLevel += Time.deltaTime * 1;
		Debug.Log(KineticLevel);
	}
	if (Input.GetButtonDown("Jump")) {
		KineticLevel = KineticLevel + 5;
		Debug.Log(KineticLevel);
	}
}