Rails.application.routes.draw do
  resources :projects
  resources :jobs
  resources :daily_members

  devise_for :users, :controllers => { :sessions => "json_sessions" }
  root to: 'home#index'
  post   'mail_job'          => 'mail_job#create'
end
