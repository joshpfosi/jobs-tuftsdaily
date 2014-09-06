Rails.application.routes.draw do
  devise_for :users, :controllers => { :sessions => "json_sessions" }
  root to: 'home#index'

  get   '/jobs'              => 'jobs#index'
  get   '/jobs/:id'          => 'jobs#show'
  get   '/daily_members'     => 'daily_members#index'
  get   '/daily_members/:id' => 'daily_members#show'
  get   '/projects'     => 'projects#index'
  get   '/projects/:id' => 'projects#show'

  post   '/jobs'             => 'jobs#create'
  post   '/daily_members'    => 'daily_members#create'
  post   '/projects'    => 'projects#create'
  post   'mail_job'          => 'mail_job#create'

  put    'jobs/:id'          => 'jobs#update'
  put    'daily_members/:id' => 'daily_members#update'
  put    'projects/:id' => 'projects#update'

  delete 'daily_members/:id' => 'daily_members#destroy'
  delete 'projects/:id' => 'projects#destroy'
end
