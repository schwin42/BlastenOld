var chargeLevel : float = 0; //Don't change this in the inspector.
var chargeSpeed : float = 1; //Default, the charge will go up 1 per second
var isCharging = false;

function Update () {
     if (Input.GetButtonDown("FireButton")) { //Did the user click?
          if(!isCharging) { //Some what unnecessary due to the way the Input is
          // setup
               isCharging = true;
               CalculateCharge();
          }
     }
}

function CalculateCharge () {
     while(Input.GetButton("FireButton")) { //Add to the charge as long as the
     // user is holding the button
          chargeLevel += Time.deltaTime * chargeSpeed;
          yield; //Will cause a crash without this.
      }

     //Fire Projectile
     // Reset the vars.
     chargeLevel = 0.0;
     isCharging = false;
}