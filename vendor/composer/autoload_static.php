<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit74f71a98538e75900675bd277511cdf2
{
    public static $prefixLengthsPsr4 = array (
        'U' => 
        array (
            'URM\\Frontend\\' => 13,
            'URM\\' => 4,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'URM\\Frontend\\' => 
        array (
            0 => __DIR__ . '/../..' . '/public',
        ),
        'URM\\' => 
        array (
            0 => __DIR__ . '/../..' . '/includes',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit74f71a98538e75900675bd277511cdf2::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit74f71a98538e75900675bd277511cdf2::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit74f71a98538e75900675bd277511cdf2::$classMap;

        }, null, ClassLoader::class);
    }
}
