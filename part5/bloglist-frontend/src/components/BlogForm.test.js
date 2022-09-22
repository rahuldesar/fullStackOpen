import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';


test(`When form calls the event handler it received as props
  with the right details when a new blog is created`, async() => {

  const createBlogMockFn = jest.fn();
  // handleNewBlogCreate

  render(<BlogForm handleNewBlogCreate={ createBlogMockFn } />);

  const inputTitle = screen.getByPlaceholderText('Blog Title');
  const inputAuthor = screen.getByPlaceholderText('Blog Author');
  const inputUrl = screen.getByPlaceholderText('Blog URL');
  const submitButton = screen.getByText('Create');

  await userEvent.type(inputTitle, 'testing a form - Title Field');
  await userEvent.type(inputAuthor, 'testing a form - Author Field');
  await userEvent.type(inputUrl, 'testing a form - URL Field');
  screen.debug();

  await userEvent.click(submitButton);

  const mockObject = {
    title: 'testing a form - Title Field',
    author: 'testing a form - Author Field',
    url: 'testing a form - URL Field',
  };
  console.log(createBlogMockFn.mock.calls[0][0]);
  expect(createBlogMockFn.mock.calls).toHaveLength(1);
  expect(createBlogMockFn.mock.calls[0][0]).toEqual(mockObject);

});


// Make a test for the new blog form. The test should check,
// that the form calls the event handler it received as props
// with the right details when a new blog is created.