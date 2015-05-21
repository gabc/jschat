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
	convo = $("#convo");
	input = $("#inputtext");
	
	$("body").css(bodyStyle);
    
	$("<input type='text' autofocus id='cmd' />").insertAfter($(".textin"));

	$("#cmd").keyup(function (e) {
		if (e.keyCode == 13) {
			execcmd();
		}
	});
}

recoitHook = function (data) {
	data = JSON.parse(data);
	var usr = "";
	var mess = "";
	for(var i = 0; i < data.length; i++) {
		usr = data[i]["nomUsager"] || "Inconnu";
		mess = data[i]["message"] || "Message";
		$("#convo").append(createSaneLi(usr, mess));
	}
	$("#divconv").scrollTop($("#divconv")[0].scrollHeight);
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
	case "d":
		input.val("");
		break;
	case "i":
		cmd = cmd.match(/\/(.*)\//)[1];
		input.val(cmd + input.val());
		break;
	case "n":
		listeUser(function (data) {
			var res = "";
			data = JSON.parse(data);
			for(var i = 0; i < data.length; i++) {
				res += data[i] + ", ";
			}
			res = res.substring(0, res.length-2);
			$("#convo").append(createSaneLi("mess", res));
		});
		break;
	case "q":
		quitte();
		/* NOT REACHED */
		break;
	case "w":
		envoieMessage();
		break;
	default:
		console.log(c + " wat");
	}
	$("#cmd").val("");
}
