<?php

    /**
     * Sample site configuration file for UserFrosting.  You should definitely set these values!
     *
     */
    return [
        'address_book' => [
            'admin' => [
                'name'  => 'PowTecH'
            ]
        ],
        'debug' => [
            'smtp' => true
        ],
        'site' => [
            'title'     =>      'Leet',
            'title2'    =>      'HQ',
            'author'    =>      'PowTecH',
            // URLs
            'uri' => [
                'author' => 'http://leethq.com'
            ],
            'registration' => [
              'enabled' => true,
              'require_email_verification' => false
            ]
        ],
        'php' => [
            'timezone' => 'America/New_York'
        ]
    ];