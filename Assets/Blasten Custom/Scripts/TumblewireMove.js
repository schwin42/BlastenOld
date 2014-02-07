#pragma strict
var speed = 0;
var target : Transform; //the enemy's target
var myTransform : Transform; //current transform data of this enemy
private var BlastenNear = false;
var AttackDistance = 0;
var HopForce = 0;

function Awake()
{
    myTransform = transform; //cache transform data for easy access/preformance
}

function Start () {


}

function Update () {

	// check distance to target every frame:
	if(target)
	{
    var distance = (target.position - myTransform.position).magnitude;
    }
    
    //Checks if Blasten is near
    if(distance < AttackDistance)
    {
		BlastenNear = true;
	}
	
	//If Blasten is near, Tumbleweed moves and does not stop until it is destroyed
	if(BlastenNear == true)
	{
		this.transform.Translate(speed * Time.deltaTime * -1, HopForce * Time.deltaTime,0);
		
	}
}