describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      username : 'roottest',
      password : 'test1234',
      name : 'rahul'
    };

    cy.request('POST','http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.get('#login-username');
    cy.get('#login-password');
    cy.get('#login-button');
  });

  describe('Login', function() {
    it('suceeds with the correct credentials', function() {
      cy.get('#login-username').type('roottest');
      cy.get('#login-password').type('test1234');
      cy.get('#login-button').click();
      cy.contains('roottest ( rahul ) logged in');
    });

    it('fails with the wrong credentials', function(){
      cy.get('#login-username').type('roottest');
      cy.get('#login-password').type('test1211');
      cy.get('#login-button').click();
      cy.get('.fail').should('contain','Login Failure as roottest. Incorrect username or password');
      cy.get('html').should('not.contain','roottest ( rahul ) logged in' );
    });
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'roottest', password: 'test1234' });
    });

    it('A blog can be created', function() {
      cy.contains('Create New Blog').click();
      cy.get('#blogForm-title').type('title written by cypress');
      cy.get('#blogForm-author').type('author written by cypress');
      cy.get('#blogForm-url').type('url written by cypress');
      cy.get('#blogForm-submit').click();
      cy.get('.success').should('contain','Blog Added: title written by cypress - author written by cypress');
      cy.contains('title written by cypress - author written by cypress');
    });

    describe('Testing Blogs, while logged in', function() {
      beforeEach(function(){
        cy.createBlog({
          title: 'title written by cypress',
          author: 'author written by cypress',
          url: 'url written by cypresss'
        });
      });

      it('Testing if user can like a blog',function(){
        cy.contains('title written by cypress - author written by cypress')
          .parent().find('.blog-view-button').click();
        cy.contains('title written by cypress - author written by cypress')
          .find('.blog-like-button').click();
        cy.contains('title written by cypress - author written by cypress')
          .find('.blog-likes').should('contain','1');
      });

      it('Testing if user can like a blog if there are multiple blogs',function(){
        cy.createBlog({
          title: 'title written by cypress2',
          author: 'author written by cypress2',
          url: 'url written by cypresss2'
        });
        cy.createBlog({
          title: 'title written by cypress3',
          author: 'author written by cypress3',
          url: 'url written by cypresss2'
        });

        cy.contains('title written by cypress2 - author written by cypress2')
          .parent().find('.blog-view-button').as('view-button1');
        cy.get('@view-button1').click();
        cy.get('@view-button1').parent().find('.blog-like-button').click();
        cy.get('@view-button1').parent()
          .find('.blog-likes').should('contain','1');
      });

      it('Testing if user can delete a blog',function(){
        cy.contains('title written by cypress - author written by cypress')
          .parent().find('.blog-view-button').as('view-button1');
        cy.get('@view-button1').click();
        cy.get('@view-button1').parent().get('.blog-remove-button').should('exist');
      });

      it('Testing if Another user can delete a blog',function(){
        cy.get('html').get('#logout-button').click();
        const user = {
          username : 'roottest2',
          password : 'test1234',
          name : 'Rahul '
        };
        cy.request('POST','http://localhost:3003/api/users', user);
        cy.visit('http://localhost:3000');
        cy.login({ username: 'roottest2', password: 'test1234' });

        cy.contains('title written by cypress - author written by cypress')
          .parent().find('.blog-view-button').as('view-button1');
        cy.get('@view-button1').click();
        cy.get('@view-button1').parent().get('.blog-remove-button').should('not.exist');
      });

    });

  });

  describe('Adding multiple blogs', function(){
    beforeEach(function() {
      cy.login({ username: 'roottest', password: 'test1234' });
      cy.createBlog({
        title: 'title written by cypress',
        author: 'author written by cypress',
        url: 'url written by cypresss',
        likes: 1
      });
      cy.createBlog({
        title: 'title written by cypress2',
        author: 'author written by cypress2',
        url: 'url written by cypresss2',
        likes: 12
      });
      cy.createBlog({
        title: 'title written by cypress3',
        author: 'author written by cypress3',
        url: 'url written by cypresss3',
        likes: 8

      });
      cy.createBlog({
        title: 'title written by cypress4',
        author: 'author written by cypress4',
        url: 'url written by cypresss4',
        likes: 88
      });
    });

    it('Testing if likes are sorted.', function(){
      cy.get('.blog-view-button').each((btn) => btn.click());
      cy.get('[data-attr="blog-wrapper"]').then(($blog) => {
        expect($blog).to.have.length(4);
        for (let i = 0; i < $blog.length; i++) {
          if (i < $blog.length - 1) {
            expect(
              Number($blog.find('[data-attr="likes-wrapper"]')[i].innerText),
            ).to.be.least(
              Number($blog.find('[data-attr="likes-wrapper"]')[i + 1].innerText),
            );
          } else {
            expect(
              Number($blog.find('[data-attr="likes-wrapper"]')[i].innerText),
            ).to.be.most(Number($blog.find('[data-attr="likes-wrapper"]')[0].innerText));
          }
        }
      });
    });

  });

});