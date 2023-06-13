git pull
yarn run build
pm2 delete "qbanca-web-next-js"
pm2 start npm --name "qbanca-web-next-js" -- start

