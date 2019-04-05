<?php

$app->group('/', function () {

  $this->get('', 'UserFrosting\Sprinkle\Site\Controller\PageController:pageIndex');

  //$this->get('/{f[/{mt.[A-Za-z]+}]', 'UserFrosting\Sprinkle\Site\Controller\PageController:pageIndex');
  //$this->post('f[/{mt:[a-zA-Z]+}[/{ha:[0-9]+}]]', 'UserFrosting\Sprinkle\Site\Controller\PageController:pageIndex');

})->add('authGuard');

$app->group('/api', function () {
  $this->post('/input', 'UserFrosting\Sprinkle\Site\Controller\PageController:apiInput');
  //$this->post('/games', 'UserFrosting\Sprinkle\Site\Controller\PageController:pageIndex');
})->add('authGuard');

$app->get('/input','UserFrosting\Sprinkle\Site\Controller\PageController:pageInput')->add('authGuard');
  
$app->get('/account', 'UserFrosting\Sprinkle\Site\Controller\PageController:pageAccount')
  ->setName('account')
  ->add('authGuard');
  
$app->get('/members', 'UserFrosting\Sprinkle\Site\Controller\PageController:pageMembers');