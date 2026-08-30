<?php

namespace Drupal\bapi_travels\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class RedirectSubscriber implements EventSubscriberInterface {

  public function checkForRedirection(RequestEvent $event) {
    $request = $event->getRequest();
    $path = $request->getPathInfo();

    // Old path -> new path. Add more pairs as needed.
    $redirects = [
      '/tours' => '/upcoming-tours',
    ];

    if (isset($redirects[$path])) {
      $response = new RedirectResponse($redirects[$path], 301);
      $event->setResponse($response);
    }
  }

  public static function getSubscribedEvents(): array {
    // Priority 250 runs before routing, so it works even for paths
    // that no longer resolve to any route.
    $events[KernelEvents::REQUEST][] = ['checkForRedirection', 250];
    return $events;
  }

}
