<?php
  require_once("action/IndexAction.php");

  $action = new IndexAction();
  $action->execute();

?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <script src="js/jquery.js"></script>
    <link rel="stylesheet" type="text/css" href="css/<?= $_SESSION["theme"] ?>_menu.css">
    <link rel="stylesheet" type="text/css" href="css/menu.css">
    <script src="js/<?= $_SESSION["theme"] ?>_menu.js"></script>
  </head>
  <body>
      <?php if($action->getError() != "correct"){ ?>
      <h2><?= $action->getError() ?></h2>
      <?php } ?>
      <form action="index.php" method="post">
      <div id="themediv">
        <p id="themetxt">Choisir le thème:</p>

        <select id="themeselect" name="theme" onchange="location = 'index.php?theme=' +this.options[this.selectedIndex].value;">
          <option value=""></option>
          <option value="retro" <?php if($_SESSION["theme"] == "retro"){ echo 'selected="selected"'; } ?> >Retro look</option>
          <option value="three" <?php if($_SESSION["theme"] == "three"){ echo 'selected="selected"'; } ?> >Wing Commander</option>
          <option value="cream" <?php if($_SESSION["theme"] == "cream"){ echo 'selected="selected"'; } ?> >Fun Funky Funk's Fun Funhouse of Funny Fun Fun Fun</option>
        </select>
      </div>
      <input type="text" autofocus name="usr" value="<?php if(isset($_SESSION['usr'])){ echo $_SESSION['usr'];} ?>" placeholder="Utilisateur" />
      <input type="password" name="pwd" placeholder="Mot de passe"/>
      <button id="ntnlogin">go.</button>
      <br>
      <br>
      <a href="inscription.php"><span>S'inscrire</span></a>
    </form>

  </body>
</html>
