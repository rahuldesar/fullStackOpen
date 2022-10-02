import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

const blog = {
  author: 'TestAuthor',
  id: '6325f338da679fb7a7dab567',
  likes: 119,
  title: 'TestTitle',
  url: 'TestUrl',
  user: '6325e871b47592a8d6116297',
};

test('renders only title and author,but not url and likes by default', () => {
  render(<Blog blog={blog} />);
  const elementTitle = screen.getByText('TestTitle - TestAuthor');
  expect(elementTitle).toBeDefined();
});

test("blog's url and likes are shown when the button is clicked", async () => {
  // const mockHandler = jest.fn();
  // const mockHandler2 = jest.fn();
  const mockUser = jest.mock();

  render(
    <Blog
      blog={blog}
      // handleBlogUpdate={ mockHandler }
      // handleBlogRemove = { mockHandler2 }
      user={mockUser}
    />
  );
  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

  const elementUrl = screen.getByText('TestUrl');
  const elementLikes = screen.getByText(119);

  expect(elementUrl).toBeDefined();
  expect(elementLikes).toBeDefined();
});

test(' the like button is clicked twice, the event handler is called twice', async () => {
  const mockHandler = jest.fn();
  // const mockHandler2 = jest.fn();
  const mockUser = jest.mock();

  render(
    <Blog
      blog={blog}
      handleBlogUpdate={mockHandler}
      // handleBlogRemove = { mockHandler2 }
      user={mockUser}
    />
  );
  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

  const likeButton = screen.getByText('Like');
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
