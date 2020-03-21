let owner = env.get('parentOwner');
let repo = env.get('parentRepo');
let branch = env.get('parentBranch');
let submoduleOwner = env.get('submoduleOwner');
let submoduleRepo = env.get('submoduleRepo');
let submoduleBranch = env.get('submoduleBranch');
let submodulePath = env.get('submodulePath');

let parentSha = api.run('github.get_branch_for_repo', {
  owner,
  repo,
  branch
})[0].commit.sha;

let submoduleSha = api.run('github.get_branch_for_repo', {
  owner: submoduleOwner,
  repo: submoduleRepo,
  branch: submoduleBranch
})[0].commit.sha;

let treeSha = api.run('github.create_git_tree', {
  owner: owner,
  repo: repo,
  $body: {
    "base_tree": parentSha,
    "tree": [{
      "path": submodulePath,
      "mode": "160000",
      "type": "commit",
      "sha": submoduleSha
    }]
  }
})[0]

let commitSha = api.run('github.create_git_commit', {
  owner: owner,
  repo: repo,
  $body: {
    "message": `Auto-update submodule ${submoduleOwner}/${submoduleRepo} to ${submoduleSha}`,
    "tree": treeSha.sha,
    "parents": [parentSha]
  }
})[0]

let editSha = api.run('github.edit_git_ref', {
  owner: owner,
  ref: `heads/${branch}`,
  repo: repo,
  $body: {
    "sha": commitSha.sha
  }
})
return editSha;