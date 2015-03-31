$(init);

var convo;
var bodyStyle =
	{"backgroundColor" : "black"
	 ,"color" : "orange"
	};

var buffer; /* Contenant le contenu, avant l'envoit */
var cmd; /* La string de commande */

function init() {
    /* Y'a mieux? */
    var convo = $(".convo")[0];

    $("body").css(bodyStyle);
    $("#btngo").unbind("click");
    $("#btngo").click(execcmd);
    
    $("<input type='text' autofocus id='cmd' />").insertAfter($("#btngo"));
}

function execcmd() {
	cmd = $("#cmd").val();

	switch(cmd[0]){
	case "w":
		envoieMessage();
		break;
	default:
		console.log(cmd + " wat");
	}
}
