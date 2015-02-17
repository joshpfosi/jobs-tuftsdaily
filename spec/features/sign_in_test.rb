require 'rails_helper'

def wait_for_ajax
  counter = 0
  while true
    active = page.execute_script("return $.active").to_i
    #puts “AJAX $.active result: “ + active.to_s

    break if active < 1
    counter += 1
    sleep(0.1)
    raise "AJAX request took longer than 5 seconds OR there was a JS error. Check your console." if counter >= 50
  end
end

describe "the signin process", :type => :feature, :js => true do
  before :each do
    User.create!(:email => 'user@example.com', :password => 'password')
  end

  it "signs me in" do
    visit '/'
    #wait_for_ajax
    within("#tufts-nav") do
      fill_in 'email', :with => 'user@example.com'
      fill_in 'password', :with => 'password'
    end
    click_button 'Sign In'
    expect(page).to have_content 'Success'
  end
end
