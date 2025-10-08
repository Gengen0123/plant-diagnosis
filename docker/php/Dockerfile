FROM php:8.3-fpm-alpine

# 必要拡張
RUN apk add --no-cache git unzip libpng-dev icu-dev oniguruma-dev libzip-dev \
 && docker-php-ext-install pdo_mysql mbstring intl zip

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# 権限（開発用）
RUN addgroup -g 1000 www && adduser -G www -g www -s /bin/sh -D www \
 && chown -R www:www /var/www/html

USER www
