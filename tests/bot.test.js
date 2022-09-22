import { createComment } from '../src/bot.js';

test('Creates a comment', async () => {
    expect(createComment()).toEqual({ id: '123' });
});