Rails.application.routes.draw do
  get '/' => 'random_quotes#index'
end
