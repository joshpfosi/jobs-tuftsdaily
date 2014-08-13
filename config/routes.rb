Rails.application.routes.draw do
  root to: 'home#index'

  get '/jobs'              => 'jobs#index'
  get '/jobs/:id'          => 'jobs#show'
  get '/daily_members/:id' => 'daily_members#show'
  get '/daily_members'     => 'daily_members#index'
end
