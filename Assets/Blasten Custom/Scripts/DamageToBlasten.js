var explosion : GameObject;
var explosionSound : GameObject;
var BlastenHealth : float; //Edit: should be camelcase
var damageRateTouch : float = 1f;
var hitByEmemySFX : GameObject;
var hitByEmemyFX : GameObject;
var ResetUponDeath : GameObject; //Edit: should be camelcase?
//private var RateCount : float = 0.0f;

//Invincibility - When Blasten is hit, he will become 
private var isInvincible : boolean = false; //Is Blasten currently invincible?
public var invincibilityDuration : float = 1.0f; //Configurable- Time in seconds that invincibility lasts
public var blinkDuration : float = 0.2F; //Configurable- Time in seconds to wait before enabling/disabling invincibility blink
private var invincibilityElapsed: float; //Temporary- Progress towards invincibility end
private var blinkElapsed : float; //Temporary- Progress towards blink switch
public var modelRenderer : Renderer; //Assignable- Blasten model renderer component



//Health Bar Variables
private var barDisplay : float = 0;
private var pos : Vector2 = new Vector2(20,40);
private var size : Vector2 = new Vector2(60,20);
private var progressBarEmpty : Texture2D;
private var progressBarFull : Texture2D;

// Blasten explodes on death
function Update () {
	if (BlastenHealth <= 0){
			Instantiate(ResetUponDeath, transform.position, transform.rotation);
			Instantiate(explosion, transform.position + Vector3(0, 1, 0), transform.rotation);
			Instantiate(explosionSound, transform.position, transform.rotation);
			Destroy(this.gameObject);
			}	
	barDisplay = BlastenHealth * 0.01;
	
	if(isInvincible)
	{
		invincibilityElapsed += Time.deltaTime; //Increment invincibility timer
		blinkElapsed += Time.deltaTime; //Increment blink timer
		
		if(blinkElapsed > blinkDuration)
		{
			blinkElapsed = 0;
			if(modelRenderer.enabled == false)
			{
			modelRenderer.enabled = true;
			} else
			{
			modelRenderer.enabled = false;
			}
		}
	
		if(invincibilityElapsed > invincibilityDuration) //Disable invincibility after duration has elapsed
			{
			isInvincible = false;
			gameObject.layer = 9; // Set layer to player
			
			if(!modelRenderer.enabled)
			{
			modelRenderer.enabled = true;
			}
			}
	}
}

// Different types of damages to Blasten and their effects
function OnCollisionEnter (col : Collision){
	if (col.gameObject.tag =="SmallEnemyCollision") {
		TakeHit(10);
	}
	if (col.gameObject.tag =="BigEnemyCollision") {
		TakeHit(15);
	}
	if (col.gameObject.tag =="Small Projectile") {
		TakeHit(5);
	}
	

	
}


//function OnCollisionStay (col : Collision) {
  // if (col.gameObject.tag =="SmallEnemyCollision") {
   	//	RateCount += Time.deltaTime;
   	//	if (RateCount >= damageRateTouch){
      // 			BlastenHealth = BlastenHealth - 1;
       	//		Instantiate(hitByEmemySFX, transform.position, transform.rotation);
       	//		Instantiate(hitByEmemyFX, transform.position + Vector3(-0.5, 1, 0), transform.rotation);
		//		RateCount = 0.0f;
	//	}
   //}
//}

function OnGUI()
{

    // draw the background:
    GUI.BeginGroup (new Rect (pos.x, pos.y, size.x, size.y));
        GUI.Box (Rect (0,0, size.x, size.y),progressBarEmpty);

        // draw the filled-in part:
        GUI.BeginGroup (new Rect (0, 0, size.x * barDisplay, size.y));
            GUI.Box (Rect (0,0, size.x, size.y),progressBarFull);
        GUI.EndGroup ();

    GUI.EndGroup ();

} 

//Deal damageAmount to Blasten, start blinking, and disable collisions
function TakeHit(damageAmount : int)
{
	BlastenHealth -= damageAmount;
		Instantiate(hitByEmemySFX, transform.position, transform.rotation);
		Instantiate(hitByEmemyFX, transform.position + Vector3(-0.5, 1, 0), transform.rotation);
		isInvincible = true;
		invincibilityElapsed = 0f;
		gameObject.layer = 13; //Set layer to invincibility
		blinkElapsed = 0f;
		modelRenderer.enabled = false;
		Debug.Log("Took a hit.");
		
}