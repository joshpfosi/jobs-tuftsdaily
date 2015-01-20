Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'sessions' }
  namespace :api do
    resources :projects
    resources :jobs
    resources :daily_members
    get :csrf, to: 'csrf#index'
    post   'mail_job' => 'mail_job#create'
  end

  root to: 'home#index'
end
