require 'rake'

task :run do
  pids = [
    spawn("cd backend && EMBER_PORT=4900 rails s -p 3900"),
    spawn("cd frontend && ./node_modules/.bin/ember server --port=4900 --proxy-port=3900"),
  ]

  trap "INT" do
    Process.kill "INT", *pids
    exit 1
  end

  loop do
    sleep 1
  end
end

task :test do
  pids = [
    spawn("cd backend && EMBER_PORT=4900 rails s -p 3900 -e test"),
    spawn("cd frontend && ./node_modules/.bin/ember server --port=4900 --proxy-port=3900"),
  ]

  trap "INT" do
    Process.kill "INT", *pids
    exit 1
  end

  loop do
    sleep 1
  end
end

task :deploy do
  sh 'git checkout production'
  sh 'git merge master -m "Merging master for deployment"'
  sh 'rm -rf rails/public/assets'
  sh 'cd ember && BROCCOLI_ENV=production broccoli build ../rails/public/assets && cd ..'

  unless `git status` =~ /nothing to commit, working directory clean/
    sh 'git add -A'
    sh 'git commit -m "Asset compilation for deployment"'
  end

  sh 'git subtree push -P rails heroku master'

  sh 'git checkout -'
end
