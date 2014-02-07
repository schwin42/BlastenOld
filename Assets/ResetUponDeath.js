#pragma strict

private var ResetCount : float = 0.0f;

function Start () {

}

function Update () {

	ResetCount += Time.deltaTime;
	if(ResetCount >= 3){
		Application.LoadLevel("SandStage");
	}

}