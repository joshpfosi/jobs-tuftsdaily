# Shearwater Virtual Platform

### Ruby version

    ruby 2.1.2

### System dependencies

This application uses Mailcatcher. This should not be used in a Gemfile due to dependency issues. Install using `gem install mailcatcher` and run via `mailcatcher`

### Configuration

### Database creation

    rake db:setup

### Database initialization

    rake db:seed

### Testing information

Run `rspec` to run all tests

For testing individual jobs:

    worker = Delayed::Worker.new
    worker.start

### Services (job queues, cache servers, search engines, etc.)

We are using Delayed::Job to schedule many background tasks for this application. To set this up for development, start the server via `rails s`. This will create a weekly recurring job to watch for notifications for users in the application. Next, run `rake jobs:work` to start a worker or `RAILS_ENV=development bin/delayed_job start` to run as a daemon. 

### Deployment instructions

We are using CodeShip for continuous integration, so pushing to master automatically runs the test suite and initializes the notifications `Delayed::Job` system. If the database needs to be reset, this must be done manually via `heroku pg:reset`, and `heroku run rake db:seed`
