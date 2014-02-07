var explosion : GameObject;
var explosionSound : GameObject;
var enemyHealth : float;
var enemyHitSFX : GameObject;

function Update () {
	if (enemyHealth <= 0){
		Destroy(this.gameObject);
		Instantiate(explosion, transform.position + Vector3(0, 0.5, 0), transform.rotation);
		Instantiate(explosionSound, transform.position, transform.rotation);
		
	}

}

function OnTriggerEnter (col : Collider){
	if (col.gameObject.tag =="Pellet") {
		enemyHealth = enemyHealth - 10;
		Destroy(col.gameObject);
		Instantiate(enemyHitSFX, transform.position, transform.rotation);
		}
	if (col.gameObject.tag =="KineticPellet") {
		Destroy(col.gameObject);
		enemyHealth = enemyHealth - 20;
		Instantiate(enemyHitSFX, transform.position, transform.rotation);
		}
}