require 'rake'

task :run do
  pids = [
    spawn("cd rails && rails s --port=3200"),
    spawn("cd ember && ember server --proxy http://localhost:3200"),
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
  sh "cd rails && rspec"
  sh "cd ember && ember test"
end

task :deploy do
  sh 'git checkout production'
  sh 'git merge master -m "Merging master for deployment"'
  sh './build.sh'

  unless `git status` =~ /nothing to commit, working directory clean/
    sh 'git add -A'
    sh 'git commit -m "Asset compilation for deployment"'
  end

  sh 'git subtree push -P rails origin production'

  sh 'git checkout -'
end
