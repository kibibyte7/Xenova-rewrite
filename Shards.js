const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./Main.js', { token: process.env.token});

manager.spawn(2);
manager.on('launch', shard => console.log(`[SHARD] Shard ${shard.id} lancé`));
