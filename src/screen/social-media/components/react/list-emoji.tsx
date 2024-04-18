import React from 'react';
import EmojiSad from './emoji-sad';
import EmojiAngry from './emoji-angry';
import EmojiLove from './emoji-love';
import EmojiLike from './emoji-like';
import EmojiCare from './emoji-care';
import EmojiHaha from './emoji-ha-ha';
import EmojiWow from './emoji-wow';

const listEmoji = [
  {
    emoji: ({width = 40, height = 40}) => (
      <EmojiLike width={width} height={height} />
    ),
    des: 'like',
    color: 'rgb(32, 120, 244)',
  },
  {
    emoji: ({width = 40, height = 40}) => (
      <EmojiLove width={width} height={height} />
    ),
    des: 'love',
    color: 'rgb(243, 62, 88)',
  },
  {
    emoji: ({width = 40, height = 40}) => (
      <EmojiCare width={width} height={height} />
    ),
    des: 'dear',
    color: 'rgb(247, 177, 37)',
  },
  {
    emoji: ({width = 40, height = 40}) => (
      <EmojiHaha width={width} height={height} />
    ),
    des: 'laugh',
    color: 'rgb(247, 177, 37)',
  },
  {
    emoji: ({width = 40, height = 40}) => (
      <EmojiWow width={width} height={height} />
    ),
    des: 'wow',
    color: 'rgb(247, 177, 37)',
  },
  {
    emoji: ({width = 40, height = 40}) => (
      <EmojiSad width={width} height={height} />
    ),
    des: 'sad',
    color: 'rgb(247, 177, 37)',
  },
  {
    emoji: ({width = 40, height = 40}) => (
      <EmojiAngry width={width} height={height} />
    ),
    des: 'angry',
    color: 'rgb(233, 113, 15)',
  },
];

export default listEmoji;
