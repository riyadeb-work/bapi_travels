<?php

namespace Drupal\bapi_travels\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Returns responses for Bapi Travels routes.
 */
class PageController extends ControllerBase {

  /**
   * Helper method to return a standard render array with cache contexts.
   * By adding 'url.path' and 'url.query_args', we fix the issue where
   * Drupal serves the same cached page for every route.
   */
  private function buildPage() {
    return [
      '#markup' => '', // The actual markup comes from your Twig files!
      '#cache' => [
        'contexts' => [
          'url.path',
          'url.query_args' // Ensures /tours?filter=national is cached separately
        ],
      ],
    ];
  }

  public function home() {
    return $this->buildPage();
  }

  public function tours() {
    return $this->buildPage();
  }

  public function upcomingTours() {
    return $this->buildPage();
  }

  public function tourDetails() {
    return $this->buildPage();
  }

  public function cateringEvents() {
    return $this->buildPage();
  }

  public function privacy() {
    return $this->buildPage();
  }

  public function terms() {
    return $this->buildPage();
  }

}
