# Tufts Daily Job Manager #

A simple web application for managing job requests for photos for the Tufts University Daily newspaper. Editors can request jobs by visiting the home page, while photo administrators can sign in, managing and assigning the jobs to his/her staff. They can mark jobs as assigned, rejected, completed, investigated, and pending. Assigning and rejecting jobs sends templated emails to the appropriate email addressing using a modal system to simplify and unify the workflow of the administrator. Further, the application allows for easy maintenance of the entire Daily newspaper photo staff, including a section to document all kinds of useful information about each staff photographer. Finally, more than just daily photographic jobs, long term projects can similarly be tracked and updated in the Projects pane. 

The site is live at [jobs-tuftsdaily.com](http://jobs-tuftsdaily.herokuapp.com/ "site-link") 

### TODO ###

* IMPROVEMENT: Parametrize bulky ajax calls for mailing
* BUG: Solve modals overtaking mobile screen when too long
* FEATURE: Investigating a job should open blank mail modal
* BUG: State change on stock image page doesn't update
