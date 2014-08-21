Rails.application.routes.draw do
  root to: 'home#index'

  get   '/jobs'              => 'jobs#index'
  get   '/jobs/:id'          => 'jobs#show'
  get   '/daily_members'     => 'daily_members#index'
  get   '/daily_members/:id' => 'daily_members#show'

  post   '/jobs'             => 'jobs#create'
  post   '/daily_members'    => 'daily_members#create'
  post   'mail_job'          => 'mail_job#create'

  put    'jobs/:id'          => 'jobs#update'
  put    'daily_members/:id' => 'daily_members#update'

  delete 'daily_members/:id' => 'daily_members#destroy'
end
