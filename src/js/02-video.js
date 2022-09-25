import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURRENT_TIME_KEY = 'videoplayer-current-time';

const iframePlayer = document.querySelector('#vimeo-player');
const player = new Player(iframePlayer);

const onPlay = data => {
  localStorage.setItem(CURRENT_TIME_KEY, data.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

player.setCurrentTime(localStorage.getItem(CURRENT_TIME_KEY) || 0);
