import { ToLowerSnakeCasePipe } from './to-lower-snake-case.pipe';

describe('ToLowerSnakeCasePipe', () => {
  it('create an instance', () => {
    const pipe = new ToLowerSnakeCasePipe();
    expect(pipe).toBeTruthy();
  });
});
