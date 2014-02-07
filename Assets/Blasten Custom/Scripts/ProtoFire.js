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
private var ShootRight : boolean = true;

function Update (){
	
	//Determine the direction Blasten is facing 
	if (Input.GetAxis("Horizontal") > 0){
	ShootRight = true; 
	}
	if (Input.GetAxis("Horizontal") < 0){
	ShootRight = false; 
	}
	
	//What happens if Blasten fires
	if((Input.GetAxis("Trigger") == 1) && (Time.time > lastShot + fireFreq)) {
		if (Input.GetButtonDown("Fire1") && KineticLevel >= 5) {
			KineticLevel = KineticLevel -5;
			KineticShotSpawn();
		}
	}
	
	if (Input.GetButtonDown("Fire1") && (Time.time > lastShot + fireFreq)){
		PelletSpawn();
	}
	
	//Charges Kinetic Level
	KineticCharge();
}

function PelletSpawn() {
	if (ShootRight == true){ 
	lastShot = Time.time;
	Instantiate (Pellet, transform.position, Quaternion.Euler(0.0, 0.0, 0));
	Instantiate (pelletSFX, transform.position, transform.rotation);
	}
	if (ShootRight == false){
	lastShot = Time.time;
	Instantiate (Pellet, transform.position + Vector3(-2, 0, 0), Quaternion.Euler(0.0, 0.0, 180));
	Instantiate (pelletSFX, transform.position, transform.rotation);
	}
	
}

function KineticShotSpawn() {
	if (ShootRight == true){ 
	lastShot = Time.time;
	Instantiate (KineticPellet, transform.position, Quaternion.Euler(0.0, 0.0, 0));
	Instantiate (kineticPelletSFX, transform.position, transform.rotation);
	}
	if (ShootRight == false){
	lastShot = Time.time;
	Instantiate (KineticPellet, transform.position  + Vector3(-2, 0, 0), Quaternion.Euler(0.0, 0.0, 180));
	Instantiate (kineticPelletSFX, transform.position, transform.rotation);
	}
}

function KineticCharge(){
	if (Input.GetAxis("Horizontal") == 1) {
		KineticLevel += Time.deltaTime * kineticChargeRate;
	}
	if (Input.GetAxis("Horizontal") == -1) {
		KineticLevel += Time.deltaTime * kineticChargeRate;
	}
	if (Input.GetButtonDown("Jump")) {
		KineticLevel = KineticLevel + 1;
	}
	if(KineticLevel > maxKineticEnergy){
		KineticLevel = maxKineticEnergy;
	}
}

function OnGUI () {
    GUI.Label (Rect (10, 10, 100, 20), KineticLevel.ToString(), customGuiStyle);
}