Github：https://github.com/hidetatz/kubecolor

echo '# kubectl get resource' >> ~/.bashrc
echo 'alias kubectl="kubecolor"' >> ~/.bashrc
echo 'alias k="kubecolor"' >> ~/.bashrc
echo 'alias kn="kubectl get nodes -o wide"' >> ~/.bashrc
echo 'alias kp="kubectl get pods -o wide"' >> ~/.bashrc
echo 'alias kd="kubectl get deployment -o wide"' >> ~/.bashrc
echo 'alias ks="kubectl get svc -o wide"' >> ~/.bashrc
echo '# kubectl describe resources' >> ~/.bashrc
echo 'alias kdp="kubectl describe pod"' >> ~/.bashrc
echo 'alias kdd="kubectl describe deployment"' >> ~/.bashrc
echo 'alias kds="kubectl describe service"' >> ~/.bashrc
echo 'alias kdn="kubectl describe node"' >> ~/.bashrc
echo 'complete -o default -F __start_kubectl k' >> ~/.bashrc


source ~/.bashrc