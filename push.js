const webPush = require('web-push');

const vapidKeys = {
  'publicKey': 'BA5WNC_Xv-XBcL32ALs_giG2-oKRxcfvm-XsTSTiroPwQ9a2KCD2ZqPs-fxkFS6_4V5dA0-jl5m8nLk0UBa6Wnw',
  'privateKey': 'EKVLxJnrYNh7U3wNDnzR9tMzwLOysM1FLQP2HrsPjDE'
};

webPush.setVapidDetails(
  'mailto:memiljamel@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const pushSubscription = {
  'endpoint': 'https://fcm.googleapis.com/fcm/send/eQizYtVPtDM:APA91bGV5BKDOidQWOkJ8qOL5tKTrzvyJBgxmycvGu28NfaPLqcJ2Fpb7jrBaUXWqmjcoqYu-4Pe43h67eBjnqpcyTmXy2nf5Qny_Kg56NDxzz5372V3-Kl63pzxC7XyC5HmNcIVI6S1',
  'keys': {
    'p256dh': 'BPfYLulwH9JEB+0SfB2KKyvYkwNkxhmXjgaFeDaYksA2qJGCl0zv/GUoXstgtkZrUBcgveRzHF5h2CQZ02qHsWk=',
    'auth': 'iKCj86DI4HG48i0oogVlJw=='
  }
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
const options = {
  gcmAPIKey: '483426998297',
  TTL: 60
};

webPush.sendNotification(
  pushSubscription,
  payload,
  options
);