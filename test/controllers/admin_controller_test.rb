require 'test_helper'

class AdminControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get start_stop_polling" do
    get :start_stop_polling
    assert_response :success
  end

  test "should get reset_index" do
    get :reset_index
    assert_response :success
  end

  test "should get change_region" do
    get :change_region
    assert_response :success
  end

end
