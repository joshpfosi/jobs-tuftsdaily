# Tufts Daily Job Manager #

A simple web application for managing job requests for photos for the Tufts University Daily newspaper. Editors can request jobs by visiting the home page, while photo administrators can sign in, managing and assigning the jobs to his/her staff. They can mark jobs as assigned, rejected, completed, investigated, and pending. Assigning and rejecting jobs sends templated emails to the appropriate email addressing using a modal system to simplify and unify the workflow of the administrator. Further, the application allows for easy maintenance of the entire Daily newspaper photo staff, including a section to document all kinds of useful information about each staff photographer. Finally, more than just daily photographic jobs, long term projects can similarly be tracked and updated in the Projects pane. 

The site is live at [jobs-tuftsdaily.com](http://jobs-tuftsdaily.herokuapp.com/ "site-link") 

Please report bugs to joshpfosi@gmail.com

## Todo

#### Bugs
* New lines aren't represented in job description

#### Features
* Add a "notes" option to jobs so when I mark them as "Investigated" (yellow) I can write down in what way I investigated them
* Investigating a job should open blank mail modal

#### Improvements
* Positions drop down, and inactive disables them
* Parametrize bulky ajax calls for mailing
* Needs integration and unit testing on front end

## Administrative

#### Ruby version

    ruby 2.1.2

#### System dependencies

Run `npm install`, `bower install`, `bundle install` and `rake db:setup` in the appropriate directories and you should be all set.


#### Testing information

Run `rake test` to run all tests, `rspec` for backend tests, and `ember test` for the frontend.

#### Deployment instructions

Run `rake deploy` which runs all tests, builds the ember app and deploys it to branch `production`.

