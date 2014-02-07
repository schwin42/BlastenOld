var Pellet : GameObject;
var KineticPellet : GameObject;
var fireFreq : float;
var KineticLevel : float = 0;
var kineticChargeRate: float;
var maxKineticEnergy : float;
var pelletSFX : GameObject;
var kineticPelletSFX : GameObject;
var customGuiStyle : GUIStyle;
private var lastShot : float;

function Update (){
	if (Input.GetButton("Fire2") && (Time.time > lastShot + fireFreq)) {
		if (Input.GetButtonDown("Fire1") && KineticLevel >= 5) {
			KineticShotSpawn();
			KineticLevel = KineticLevel -5;
		}
	}
	
	if (Input.GetButtonDown("Fire1") && (Time.time > lastShot + fireFreq)){
		PelletSpawn();
	}
	
	//Charges Kinetic Level
	KineticCharge();
}

function PelletSpawn() {
	lastShot = Time.time;
	if (Input.GetAxis("Horizontal") == -1){
		Instantiate (Pellet, transform.position, transform.rotation);
		Instantiate (pelletSFX, transform.position, transform.rotation);
	}
}

function KineticShotSpawn() {
	lastShot = Time.time;
	Instantiate (KineticPellet, transform.position, transform.rotation);
	Instantiate (kineticPelletSFX, transform.position, transform.rotation);
}

function KineticCharge(){
	if (Input.GetAxis("Horizontal") == 1) {
		KineticLevel += Time.deltaTime * kineticChargeRate;
		Debug.Log(KineticLevel);
	}
	if (Input.GetAxis("Horizontal") == -1) {
		KineticLevel += Time.deltaTime * kineticChargeRate;
		Debug.Log(KineticLevel);
	}
	if (Input.GetButtonDown("Jump")) {
		KineticLevel = KineticLevel + 1;
		Debug.Log(KineticLevel);
	}
	if(KineticLevel > maxKineticEnergy){
		KineticLevel = maxKineticEnergy;
	}
}

function OnGUI () {
    GUI.Label (Rect (10, 10, 100, 20), KineticLevel.ToString(), customGuiStyle);
}