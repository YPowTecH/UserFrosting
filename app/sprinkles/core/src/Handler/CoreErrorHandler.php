<?php
/**
 * UserFrosting (http://www.userfrosting.com)
 *
 * @link      https://github.com/userfrosting/UserFrosting
 * @copyright Copyright (c) 2013-2016 Alexander Weissman
 * @license   https://github.com/userfrosting/UserFrosting/blob/master/licenses/UserFrosting.md (MIT License)
 */
namespace UserFrosting\Sprinkle\Core\Handler;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Http\Body;

/**
 * Default UserFrosting application error handler
 *
 * It outputs the error message and diagnostic information in either JSON, XML, or HTML based on the Accept header.
 * @author Alex Weissman (https://alexanderweissman.com) 
 */
class CoreErrorHandler extends \Slim\Handlers\Error
{

    protected $ci;
    
    /**
     * @var array[] An array that maps Exception types to callbacks, for special processing of certain types of errors.
     */
    protected $exceptionHandlers = [];
    
    /**
     * Constructor
     *
     * @param boolean $displayErrorDetails Set to true to display full details
     */
    public function __construct($ci, $displayErrorDetails = false)
    {
        $this->ci = $ci;
        $this->displayErrorDetails = (bool)$displayErrorDetails;
    }
    
    public function registerHandler($exceptionClass, $handlerClass)
    {
        $this->exceptionHandlers[$exceptionClass] = $handlerClass;
    }
    
    /**
     * Invoke error handler
     *
     * @param ServerRequestInterface $request   The most recent Request object
     * @param ResponseInterface      $response  The most recent Response object
     * @param Exception              $exception The caught Exception object
     *
     * @return ResponseInterface
     */
    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, \Exception $exception)
    {
        // TODO: log server-side error messages if displayErrorDetails is false, otherwise render them
        
        // Default exception handler class
        $handlerClass = '\UserFrosting\Sprinkle\Core\Handler\ExceptionHandler';
        
        // Get the last matching registered handler class, and instantiate it
        foreach ($this->exceptionHandlers as $exceptionClass => $matchedHandlerClass)
            if ($exception instanceof $exceptionClass)
                $handlerClass = $matchedHandlerClass;
        
        $handler = new $handlerClass($this->ci);
        
        // Run either the ajaxHandler or standardHandler, depending on the request type
        if ($request->isXhr())
            return $handler->ajaxHandler($request, $response, $exception);
        else
            return $handler->standardHandler($request, $response, $exception);
        
        // If the status code is 500, log the exception's message
        if ($response->getStatusCode() == 500)
            $this->writeToErrorLog($exception);
            
        return $response;
    }
    
    /**
     * Alternative logging for errors
     *
     * @param $message
     */
    protected function logError($message)
    {
        $this->errorLogger->error($message);
    }    
}