#!/bin/bash
# MAKE wrapper needed on macOS 26 beta: clang++ can't find C++ headers without explicit SDK path
SDK_CXX_INC="$(xcrun --show-sdk-path 2>/dev/null)/usr/include/c++/v1"

cat > /tmp/make-cxx-wrapper.sh << 'EOF'
#!/bin/bash
SDK_CXX_INC="$(xcrun --show-sdk-path 2>/dev/null)/usr/include/c++/v1"
exec /usr/bin/make CXX="clang++ -I${SDK_CXX_INC}" "$@"
EOF
chmod +x /tmp/make-cxx-wrapper.sh

MAKE=/tmp/make-cxx-wrapper.sh bundle exec jekyll serve --incremental --livereload
