Rails.application.routes.draw do
  devise_for :users, :controllers => { :sessions => "json_sessions" }
  root to: 'home#index'
  resources :jobs
  resources :daily_members
  resources :projects

  post   'mail_job'          => 'mail_job#create'
end
