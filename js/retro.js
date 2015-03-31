$(init);

var convo;
var bodyStyle =
	    {"backgroundColor" : "black"
	     ,"color" : "orange"
	    };

var buffer; /* Contenant le contenu, avant l'envoit */
var cmd; /* La string de commande */
var input; /* Le truc contenant l'objet d'envoit */

function init() {
	/* Y'a mieux? */
	convo = $("#convo");
	input = $("#inputtext");
	
	$("body").css(bodyStyle);
	$("#btngo").unbind("click");
	$("#btngo").click(execcmd);
    
	$("<input type='text' autofocus id='cmd' />").insertAfter($("#btngo"));
}

function execcmd() {
	cmd = $("#cmd").val();
	var tmp;
	var c;

	if (cmd.match(/^\//)) {
		c = cmd.split('/')[2];
	} else {
		c = cmd[0];
	}
	
	switch(c){
	case "a":
		cmd = cmd.match(/\/(.*)\//)[1];
		input.val(input.val() + cmd);
		break;
	case "c":
		tmp = cmd.match(/\/(.*)\/c\/(.*)\//)[1];
		tmp = new RegExp(tmp);
		cmd = cmd.match(/\/(.*)\/c\/(.*)\//)[2];
		input.val(input.val().replace(tmp, cmd));
		break;
	case "i":
		cmd = cmd.match(/\/(.*)\//)[1];
		input.val(cmd + input.val());
		break;
	case "w":
		envoieMessage();
		break;
	default:
		console.log(c + " wat");
	}
	$("#cmd").val("");
}
